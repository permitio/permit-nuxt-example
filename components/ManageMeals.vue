<script setup lang="ts">
import type { FormSubmitEvent } from '@primevue/forms';
import { yupResolver } from '@primevue/forms/resolvers/yup';
import * as yup from 'yup';
import type { AddMealProps } from '~/types';

const initialMealValues = reactive({ name: '', price: 0 });
const isCreating = ref(false);
const meals = useMealsStore();
const resolver = yupResolver(
  yup.object().shape({
    name: yup.string().required('Required').min(3, '≥ 3 characters.'),
    price: yup
      .number()
      .typeError('Should be Numeric')
      .required('Required')
      .moreThan(0, 'Greater Than Zero')
  })
);
const toast = useToast();
const user = useUserStore();

const onFormSubmit = async (e: FormSubmitEvent) => {
  if (e.valid) {
    isCreating.value = true;
    const success = await meals.add({
      vendor: user.current,
      ...e.values
    } as AddMealProps);
    isCreating.value = false;
    if (success) {
      toast.add({ severity: 'success', summary: 'Meal Created', life: 3000 });
      (document.querySelector('input#meal-name') as HTMLInputElement).value =
        '';
      (document.querySelector('input#meal-price') as HTMLInputElement).value =
        '';
    }
  }
};
</script>

<template>
  <Form v-slot="$form" :initialMealValues :resolver @submit="onFormSubmit">
    <h3 class="text-xl my-4">Create Meal</h3>
    <div class="flex gap-4 max-[512px]:flex-col mb-6">
      <div class="flex flex-col gap-1">
        <FloatLabel variant="in">
          <InputText id="meal-name" name="name" type="text" fluid />
          <label for="meal-name">Name</label>
        </FloatLabel>
        <Message
          v-if="$form.name?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.name.error?.message }}
        </Message>
      </div>
      <div class="flex flex-col gap-1">
        <FloatLabel variant="in">
          <InputText id="meal-price" name="price" type="text" fluid />
          <label for="meal-price">Price</label>
        </FloatLabel>
        <Message
          v-if="$form.price?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.price.error?.message }}
        </Message>
      </div>
    </div>
    <p class="text-right">
      <Button type="submit" label="Create" :loading="isCreating" />
    </p>
  </Form>
  <div class="mt-12 mb-8 h-0.5 bg-gray-500 bg-opacity-10"></div>
  <h3 class="text-xl mb-4">Meals</h3>
  <p v-if="meals.all.length == 0" class="text-center opacity-30 mt-4 mb-8">
    No Meals. Create Them.
  </p>
  <div
    class="flex items-start border border-opacity-25 border-gray-500 rounded-lg px-4 py-3 mb-4"
    v-for="{ id, name, price } of meals.all"
  >
    <p class="grow flex justify-between">
      <span class="font-bold">{{ name }}</span>
      <span class="text-nowrap">{{ price }} 💵</span>
    </p>
    <div class="bg-gray-500 ml-3 self-stretch w-0.5 bg-opacity-10"></div>
    <Button
      severity="contrast"
      variant="text"
      icon="pi pi-trash"
      class="text-red-500 px-2 !py-0 -mr-3"
      @click="meals.remove(id)"
    />
  </div>
</template>
