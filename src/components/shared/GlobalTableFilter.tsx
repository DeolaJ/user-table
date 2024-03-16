import { useState, ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Icon, Input, InputGroup, InputGroupProps, InputLeftElement } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

interface GlobalTableFilterProps extends InputGroupProps {
    globalFilter: string;
    setGlobalFilter: Dispatch<SetStateAction<string>>;
    disabled?: boolean;
    placeholder: string;
}

function GlobalTableFilter({
    globalFilter,
    setGlobalFilter,
    disabled,
    placeholder,
    ...props
}: GlobalTableFilterProps) {
    const [value, setValue] = useState(globalFilter);

    const debouncedSetGlobalFilterOnChange = useDebouncedCallback((value) => {
        setGlobalFilter(value || "");
    }, 500);

    function handleSearchBarChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
        debouncedSetGlobalFilterOnChange(e.target.value);
    }

    useEffect(() => {
        setValue(globalFilter);
    }, [globalFilter]);

    return (
        <InputGroup {...props}>
            <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} h="100%" color="gray.500" />
            </InputLeftElement>
            <Input
                py="1.5"
                variant="primary"
                fontSize={{ base: "sm", md: "md" }}
                disabled={disabled}
                value={value || ""}
                onChange={handleSearchBarChange}
                placeholder={placeholder || "Search..."}
            />
        </InputGroup>
    );
}

export default GlobalTableFilter;
