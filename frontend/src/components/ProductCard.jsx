import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Heading, HStack, IconButton, Image, useColorModeValue, Text, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Input, VStack, ModalBody, ModalFooter, Button, useDisclosure } from "@chakra-ui/react"
import { useProductStore } from "../store/product"
import { useState } from "react"

const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.600", "gray.200")
    const bg = useColorModeValue("white", "gray.800")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [updatedProduct, setUpdatedPProduct] = useState(product)

    const {deleteProduct, updateProduct} = useProductStore();
    const toast = useToast();
    const handleDeleteProduct = async (pid) =>{
        const {success, message} = await deleteProduct(pid);
        if(!success){
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                isClosable: true
            })
        }else{
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                isClosable: true
            })
        }
    }
    const handleUpdate = async (pid, prod) => {
        const {success, message} = await updateProduct(pid, prod);
        onClose();
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
        }else{
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true
            })
        }
    }

  return (
    <Box
        shadow={'lg'}
        rounded={'lg'}
        overflow={'hidden'}
        transition={'all 0.3s'}
        _hover={{ transform: "translateY(-5px)", shadow: 'xl' }}
        bg={bg}
    >
        <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
        
        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                ${product.price}
            </Text>

            <HStack spacing={2}>
                <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue"></IconButton>
                <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme="red"></IconButton>
            </HStack>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <VStack spacing={4}>
                        <Input 
                            placeholder="Product Name"
                            name="name"
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedPProduct({...updatedProduct, name: e.target.value})}
                        />
                        <Input 
                            placeholder="Price"
                            name="price"
                            type="number"
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedPProduct({...updatedProduct, price: e.target.value})}
                        />
                        <Input 
                            placeholder="Image"
                            name="image"
                            value={updatedProduct.image}
                            onChange={(e) => setUpdatedPProduct({...updatedProduct, image: e.target.value})}
                        />
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={() => handleUpdate(product._id, updatedProduct)}>
                        Update
                    </Button>
                    <Button colorScheme="ghost" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
  )
}

export default ProductCard