import { Button, ButtonProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

function OutlineButton({ children, ...props }: PropsWithChildren<ButtonProps>) {
    return (
        <Button
            bg="white"
            fontSize="sm"
            borderRadius="8px"
            border="2px solid"
            borderColor="body.500"
            color="body.500"
            boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
            px="4"
            py="2"
            _hover={{ bgColor: "gray.100" }}
            {...props}
        >
            {children}
        </Button>
    );
}

export default OutlineButton;
