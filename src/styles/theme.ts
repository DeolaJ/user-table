import { extendTheme } from "@chakra-ui/react";

const fontFamily = "'Be Vietnam Pro', system-ui, Helvetica, Arial, sans-serif;";

export const theme = extendTheme({
    fonts: {
        heading: fontFamily,
        body: fontFamily,
    },
    colors: {
        primary: {
            100: "#FFEAFB",
            200: "#B60AF9",
            300: "#AF3B96",
            500: "#7B1E7A",
            700: "#35084C",
            900: "#0C0A3E",
        },
        body: {
            100: "#EFF6FF",
            200: "#D2DDEB",
            500: "#1B1C1D",
        },
    },
    components: {
        Input: {
            baseStyle: {
                field: {
                    _placeholder: { color: "gray.400" },
                    _invalid: {
                        borderColor: "red.500",
                    },
                },
            },
            variants: {
                primary: {
                    field: {
                        py: "2",
                        px: "3",
                        fontSize: "md",
                        border: "1px solid",
                        borderColor: "body.200",
                        color: "body.500",
                        borderRadius: "lg",
                        bg: "white",
                        _hover: {
                            borderColor: "primary.300",
                        },
                        _focus: {
                            borderColor: "primary.500",
                        },
                        _focusVisible: {
                            borderColor: "primary.500",
                        },
                        _disabled: {
                            bgColor: "gray.400",
                        },
                    },
                },
            },
        },
    },
    styles: {
        global: {
            body: {
                color: "body.500",
            },
        },
    },
});
