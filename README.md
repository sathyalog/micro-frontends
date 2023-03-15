1. We will have a container app, products app and cart app like shown in below.
   ![Micro Frontends|Project Structure](/images/micro-frontends-1.png)

2. Products app will be built as a JS app with no framework.
3. We have to be able to run each app in isolation(on its own)
4. We have to be able to run it through the container app. Which means get all the products from products app(remote) to be displayed in container app(Host)
5. HTML Webpack plugin is gonna take a look at the different files that are coming out of Webpack. It's gonna take a look at those file names, and then automatically update that HTML document
6. Steps we gonna follow..
   ![Micro Frontends|Step by Step](/images/micro-frontends-2.png)
7. Create module federation configuration in remote like as follows..
![Micro Frontends|Step by Step](/images/micro-frontends-8.png)
click the following collapsed section(Remote Module Federation Code) to view the code..
<details><summary>Remote Module Federation Code</summary>
<p>

#### Module Federation Plugin exposing index.js from products(Remote) to container app(Host)!

```ruby

    new ModuleFederationPlugin({
      name: "products",
      filename: "remoteEntry.js",
      exposes: {
        "./ProductsIndex": "./src/index",
      },
    }),
```

</p>
</details>

8. Create module federation configuration in host(Container app) to access the remote(Products app)
![Micro Frontends|Step by Step](/images/micro-frontends-7.png)
click the following collapsed section(Host Module Federation Code) to view the code..
  <details>
    <summary>Host Module Federation Code</summary>
<p>

#### Fetch products index.js from remote(products app)

```ruby

    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        products: "products@http://localhost:8081/remoteEntry.js",
      },
    }),
```

</p>
</details>

9. Now, import Remote files(products app index.js) easily in Host(Container app) like follows..
   `import "products/ProductsIndex";`
10. All set now, run `npm start` in container app to see products code running in container app i.e., displaying fake product names which is actually part of products app is displayed now in container app.
11. If we notice keenly, we can see http://localhost:8080(container application) is fetching products from remote products app(http://localhost:8081).
    ![Micro Frontends|Step by Step](/images/micro-frontends-3.png)
12. Quick glance to understand the flow of steps..
    ![Micro Frontends|Step by Step](/images/micro-frontends-6.png)
13. Now, we have added cart application as remote and fetch the cart feature of showing cart items in our host(container app). Like shown below..
    ![Micro Frontends|Step by Step](/images/micro-frontends-10.png)
14. With this, different teams can work independently on different apps like shown below..
    ![Micro Frontends|Step by Step](/images/micro-frontends-12.png)
15. If you notice keenly, both products, cart shares faker module like shown below. Hence we need to find a way to use Shared Modules. You can notice the same in network tab where vendor_node_modules_faker loads twice.
    ![Micro Frontends|Step by Step](/images/micro-frontends-13.png)
16. To avoid duplicate loading and execution time, we can use module federation configuration to share between 2 apps. Simple snippet in both cart & products helps in our case. `shared: ["faker"]`. But we will encounter an error in our cart or product app as it has standalone import of faker module. Hence we need to import faker module asynchronously. So, we will move index.js file into bootstrap and import bootstrap async fashion in index.js. For more details follow the commit "shared module"
    **standalone import:** `import "./bootstrap";`
    **functional import(also async import) :** `import("./bootstrap");`
