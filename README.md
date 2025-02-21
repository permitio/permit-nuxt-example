# Food Delivery Ecosystem with RBAC and Permit.io

This repository contains a Nuxt.js project that demonstrates how to implement Role-Based Access Control (RBAC) in a food delivery ecosystem. The project leverages [Permit.io](http://permit.io/) for managing and syncing user roles, policies, and multitenant authorization—using cities as tenants.

## Repo Branches

This repo has 2 branches. The code in each branch resemble each other but are slightly modified to express the particular concept being showcased. Also, splitting them like this helps you understand what's going on in a particular concept. The repo branches are as follows:

- `rbac-multitenancy`: Demonstrates Role-Based Access Control (RBAC) and Multitenancy
- `abac-rebac`: Demonstrates Attribute-Based Access Control (ABAC) and Relationship-Based Access Control (ReBAC)

You are currently in the **`rbac-multitenancy`** branch.

## Key Features

- **Role-Based Access Control (RBAC):**

  - Define roles (customer, vendor, rider, admin) and resources (Meals, Orders) to control access.
  - Manage permissions via Permit.io policies.

- **Multitenancy:**

  - Use cities as tenants to isolate data and role assignments.
  - Ensure that users have tenant-specific roles (e.g., a rider in California vs. a rider in Washington).

- **Permit.io Integration:**

  - Synchronize users and roles with Permit.io using a modal in the UI and a dedicated server endpoint.
  - Assign roles in the context of tenants by providing the `tenant` key during API calls.
  - Benefit from Permit.io's built-in multitenancy and policy enforcement.

- **Nuxt.js Server and Vue Frontend:**

  - Build the backend with Nuxt server routes powered by Nitro and h3.
  - Use Nuxt’s `$fetch` composable for API calls.
  - Manage application state with [Pinia](https://pinia.vuejs.org/).

- **UI Components:**
  - Use [PrimeVue](https://primevue.org/) for a rich, interactive interface.
  - Leverage [tailwindcss](https://tailwindcss.com/) for styling.

## Project Structure

- **/server:** Contains Nuxt server routes and middleware for handling API requests, authorization checks, and connecting to Permit.io.
- **/components:** Vue components including the navigation, OrdersDisplay, ManageMeals, and a modal for managing user roles.
- **/stores:** Pinia stores for managing state such as cities, meals, and orders.
- **/pages:** Has each Nuxt page for each role's context
- **/temp:** Temporary JSON-files-based database for Orders and Meals

## Running the Project

1. **Configure Permit.io in the UI Console:**
   - Create or use a Project in https://app.permit.io for this Food Delivery repo.
   - Create 2 resources with their actions:
      - Meal: create, read, update, and delete.
      - Order: create, read, fulfill, assign-rider, and deliver.
   - Update the Policy Editor and grant permissions for the right actions.

   ![](./rbac-policies.gif)

2. **Clone the Repository:**
   ```bash
   git clone https://github.com/permitio/permit-nuxt-example.git
   cd permit-nuxt-example
   ```
3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Provide Environment Variables:**
   - Obtain a Permit token from the [project settings in the Permit Console](https://app.permit.io/settings/api-keys).
   - Create a `.env` file at the root of the project with the following:
     ```bash
     PERMIT_TOKEN=permit_key_XXXXXXXXXXXXXXXXXXXXXXXXX
     PERMIT_PDP=https://cloudpdp.api.permit.io
     ```
5. **Run the Development Server:**
   ```bash
   npm run dev
   ```
6. **Access the App:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.
