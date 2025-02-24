<script setup lang="ts">
import type { FormSubmitEvent } from '@primevue/forms';
import { yupResolver } from '@primevue/forms/resolvers/yup';
import * as yup from 'yup';
import type { Order } from '~/types';

const isAssigningRider = ref(false);
const isDelivering = ref(false);
const isFulfilling = ref(false);
const initialRider = reactive({ rider: '' });
const orders = useOrdersStore();
const resolver = yupResolver(
  yup.object().shape({
    rider: yup.string().required('Required').min(3, '≥ 3 characters.')
  })
);
const time = useTimeStore();
const toast = useToast();

const displayOrderDetails = (order: Order) => ({
  'Order Time': time.display(order.orderTime),
  Customer: order.customer,
  Vendor: order.vendor,
  'Fulfilled Time': order.fulfilledTime
    ? time.display(order.fulfilledTime)
    : '',
  'Rider Assigned Time': order.riderAssignedTime
    ? time.display(order.riderAssignedTime)
    : '',
  Rider: order.rider ?? '',
  'Delivered Time': order.deliveredTime ? time.display(order.deliveredTime) : ''
});

const fulfill = async (orderId: number) => {
  isFulfilling.value = true;
  const success = await orders.fulfill(orderId);
  isFulfilling.value = false;
  if (success) {
    toast.add({
      severity: 'success',
      summary: 'Order Fulfilled',
      life: 3000
    });
  }
};

const assignRider = async (e: FormSubmitEvent, orderId: number) => {
  if (e.valid) {
    isAssigningRider.value = true;
    const success = await orders.assignRider(orderId, e.values.rider);
    isAssigningRider.value = false;
    if (success) {
      toast.add({ severity: 'success', summary: 'Assigned Rider', life: 3000 });
    }
  }
};

const deliver = async (orderId: number) => {
  isDelivering.value = true;
  const success = await orders.deliver(orderId);
  isDelivering.value = false;
  if (success) {
    toast.add({
      severity: 'success',
      summary: 'Order Delivered',
      life: 3000
    });
  }
};
</script>

<template>
  <p v-if="orders.all.length == 0" class="text-center opacity-30 mt-4 mb-8">
    No Orders Yet.
  </p>

  <Accordion :value="orders.all.map(({ id }) => id)" multiple>
    <AccordionPanel
      v-for="order of orders.all"
      :key="order.id"
      :value="order.id"
    >
      <AccordionHeader>
        <div class="grow flex justify-between mr-4">
          <h3>Order #{{ order.id }}</h3>
          <span> {{ order.grandTotal }} 💵 </span>
        </div>
      </AccordionHeader>
      <AccordionContent>
        <div class="max-w-xs">
          <div
            class="flex items-start justify-between mb-1 text-sm"
            v-for="{ quantity, name, price } of order.meals"
          >
            <p>
              <span>{{ name }}</span>
              <span v-if="quantity > 1" class="ml-1 last:opacity-75">
                (x{{ quantity }})
              </span>
            </p>
            <span class="text-nowrap">{{ price * quantity }} 💵</span>
          </div>
          <p class="flex items-start justify-between text-sm mb-1">
            <span>Total Price</span>
            <span class="text-nowrap underline">
              {{ order.totalPrice }} 💵
            </span>
          </p>
          <p class="flex items-start justify-between text-sm mb-1">
            <span>Delivery Fee</span>
            <span class="text-nowrap">
              {{ order.deliveryFee ? `${order.deliveryFee} 💵` : 'FREE' }}
            </span>
          </p>
          <p class="flex items-start justify-between mb-2">
            <span>Grand Total</span>
            <span class="text-nowrap font-bold underline">
              {{ order.grandTotal }} 💵
            </span>
          </p>
        </div>
        <ul class="border-b mb-3">
          <li
            v-for="(value, key) in displayOrderDetails(order)"
            class="border border-b-0 text-sm"
          >
            <span
              class="bg-gray-500 w-32 py-1 px-2 inline-block bg-opacity-25 border-r"
            >
              {{ key }}:
            </span>
            <span class="inline-block py-1 px-2">{{ value }}</span>
          </li>
        </ul>

        <div class="flex flex-wrap justify-end gap-4">
          <Button
            type="submit"
            label="Fulfill"
            v-if="!order.fulfilledTime"
            @click="fulfill(order.id)"
            :loading="isFulfilling"
          />
          <Button
            type="submit"
            label="Deliver"
            v-if="!order.deliveredTime"
            @click="deliver(order.id)"
            :loading="isDelivering"
          />
          <Form
            v-slot="$form"
            :initialRider
            :resolver
            @submit="(e) => assignRider(e, order.id)"
            v-if="!order.riderAssignedTime"
            class="flex gap-4 items-end"
          >
            <div class="flex flex-col gap-1">
              <FloatLabel variant="in">
                <InputText id="rider-name" name="rider" type="text" />
                <label for="rider-name">Rider</label>
              </FloatLabel>
              <Message
                v-if="$form.rider?.invalid"
                severity="error"
                size="small"
                variant="simple"
              >
                {{ $form.rider.error?.message }}
              </Message>
            </div>
            <Button
              type="submit"
              label="Assign"
              :class="$form.rider?.invalid ? 'mb-6' : ''"
              :loading="isAssigningRider"
            />
          </Form>
        </div>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>
