import { Input as ChakraInput, FormLabel, FormControl, InputProps as ChakraInputProps, FormErrorMessage } from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> =
  ({ name, label,error=null, ...rest }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <ChakraInput
          id={name}
          name={name}
          bgColor="gray.900"
          variant="filled"
          _focus={{
            bgColor: 'gray.900',
            borderColor: 'yellow.500',
          }}
          _hover={{
            bgColor: 'gray.900'
          }}
          size="lg"
          ref={ref}
          {...rest}
        />
        {!!error && (<FormErrorMessage>
           {error.message}
        </FormErrorMessage>)}
      </FormControl>
    )
  }

export const Input = forwardRef(InputBase)