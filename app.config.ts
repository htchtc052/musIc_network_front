export default defineAppConfig({
    ui: {
        strategy: "override",
        primary: "green",
        gray: "cool",
        avatar: {
            size: {
                xl: "h-32 w-32",
            },
        },
        card: {
            base: "border-1",
            rounded: "rounded-lg",
        },
        container: {
            constrained: 'max-w-screen-lg'
        },
        icons: {
            dynamic: true
        }


    },
    container: {},
});