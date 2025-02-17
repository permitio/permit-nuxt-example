<script setup lang="ts">
import type { Meal, MealInOrder } from '~/types';

const cart = ref<MealInOrder[]>([]);
const cartTotal = computed(() =>
  cart.value.reduce((sum, { price, quantity }) => price * quantity + sum, 0)
);
const isCreating = ref(false);
const meals = useMealsStore();
const orders = useOrdersStore();
const toast = useToast();
const user = useUserStore();

const addToCart = (meal: Meal) => {
  const index = cart.value.findIndex(({ id }) => meal.id == id);
  if (index == -1) {
    cart.value.push({ ...meal, quantity: 1 });
  } else {
    cart.value[index].quantity++;
  }
};

const orderNow = async () => {
  if (cart.value.length == 0) {
    toast.add({
      severity: 'info',
      summary: 'Add Meals to Cart First',
      life: 3000
    });
  } else {
    isCreating.value = true;
    const success = await orders.add({
      meals: cart.value,
      customer: user.current,
      vendor: cart.value[0].vendor
    });
    isCreating.value = false;
    if (success) {
      cart.value = [];
      toast.add({
        severity: 'success',
        summary: 'Order Placed',
        detail: 'Check Orders Tab',
        life: 7000
      });
    }
  }
};

const removeFromCart = (meal: Meal) => {
  const index = cart.value.findIndex(({ id }) => meal.id == id);
  if (index > -1) {
    if (cart.value[index].quantity == 1) {
      cart.value.splice(index, 1);
    } else {
      cart.value[index].quantity--;
    }
  }
};
</script>

<template>
  <Tabs value="0">
    <TabList>
      <Tab value="0">Cart</Tab>
      <Tab value="1">Orders</Tab>
    </TabList>

    <TabPanels>
      <TabPanel value="0">
        <h3 class="text-xl my-4">Cart</h3>
        <p v-if="cart.length == 0" class="text-center opacity-30 mb-8">
          Empty Cart. Add Meals.
        </p>
        <div v-else class="max-w-xs">
          <div
            class="flex items-start justify-between mb-2"
            v-for="{ quantity, name, price } of cart"
          >
            <p>
              <span>{{ name }}</span>
              <span v-if="quantity > 1" class="ml-1 last:opacity-75 text-sm">
                (x{{ quantity }})
              </span>
            </p>
            <span class="text-nowrap">{{ price * quantity }} 💵</span>
          </div>
          <p class="flex items-start justify-between mb-6">
            <span class="font-bold">Total</span>
            <span class="text-nowrap font-bold underline">
              {{ cartTotal }} 💵
            </span>
          </p>
        </div>
        <p class="text-right">
          <Button
            type="submit"
            label="Order Now"
            @click="orderNow"
            :loading="isCreating"
          />
        </p>
        <div class="mt-12 mb-8 h-0.5 bg-gray-500 bg-opacity-10"></div>
        <h3 class="text-xl mb-4">Meals</h3>
        <p
          v-if="meals.all.length == 0"
          class="text-center opacity-30 mt-4 mb-8"
        >
          No Meals Yet.
        </p>
        <div
          class="flex items-start border border-opacity-25 border-gray-500 rounded-lg px-4 py-3 mb-4 md:max-w-md"
          v-for="meal of meals.all"
        >
          <p class="grow flex justify-between">
            <span class="font-bold">{{ meal.name }}</span>
            <span class="text-nowrap">{{ meal.price }} 💵</span>
          </p>
          <div class="bg-gray-500 ml-3 self-stretch w-0.5 bg-opacity-10"></div>
          <Button
            severity="contrast"
            variant="text"
            icon="pi pi-plus"
            class="!text-primary px-2 !py-0 -mr-3"
            @click="addToCart(meal)"
          />
          <Button
            :disabled="cart.findIndex(({ id }) => meal.id == id) == -1"
            severity="contrast"
            variant="text"
            icon="pi pi-minus"
            class="!text-red-500 px-2 !py-0 -mr-3"
            @click="removeFromCart(meal)"
          />
        </div>
      </TabPanel>

      <TabPanel value="1">
        <OrdersDisplay />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>
