# LIONSENTRY Project Details

## Directory map

```
LIONSENTRY-REACT-FRONT-END
│   README.md
│   package.json
|   tailwind.config.ts
└───public /* static directory for public assets */
└───src
│   │   middleware.ts /* Route rules for nextjs */
│   │   shared.types.ts /* All of the global types that are shared across
|   |                    * multiple components*/
│   └───app
│   │   └─── (hasSidebar) /* Grouped route for hasSidebar layout*/
|   │   |    | layout.tsx /* Layout for the specific group */
|   │   |    |
│   |   |    └───   dashboard / devotionals/ etc. /* All routes that use the layout*/
│   |   |    └─── (noSidebar) /* Grouped route for noSidebar layout*/
|   |   | ...
|   └───components
|   |   └───Global /* all components that are shared between pages */
|   |   └───Home / Login / Signup /* components for specific routes */
│   └───fonts /* directory to store font files */
└───lib
|   └───app /* App server actions */
|   └───auth /* Auth server actions */
|   └───constants /* Constants to use in the app */
|   └───hookes /* Shared hooks */
|   | constants.ts
|   | utils.ts
```

## Components

All of the global elements in the sites are broken down into global components so we can reuse them wherever we want. Doing it this way, we don't need to manage the same style in multiple places.

The most important global components that we need to mention are buttons and gradient backgrounds.

- **Button:**
  We have multiple styles, and usually, we need to apply multiple tailwind css classes. It would be very redundant to apply the same set of classes everywhere, especially, when we want to update the style, we need to find all of the buttons that we have to update them.
  Therefore, we have the button component. When you use this component, you can choose the button style and also add custom css classes as needed.
- **Background Gradients:**
  There are several styles of gradient bg in the design. All of them are fairly complicated. When they are reused in multiple places, it would be a hassle to keep duplicating the complicated layouts. By using these wrapper bg components, we just need to have the section content as the component children.

## Middleware

We are currently using this to intercept nextjs requests. Specifically, reroute users when they are not authorized.
