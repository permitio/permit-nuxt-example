<template>
  <Tabs value="0">
    <TabList>
      <Tab value="0">Orders</Tab>
      <Tab value="1">Meals</Tab>
    </TabList>

    <TabPanels>
      <TabPanel value="0">
        <OrdersDisplay />
      </TabPanel>

      <TabPanel value="1">
        <ManageMeals />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>
