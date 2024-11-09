"use client";
import { Button } from '@nextui-org/button';

const PrimaryButton = ({fullWidth, onPress, color="secondary",type, onClick, className, ariaLable, isIconOnly=false, startContent, endContent, isDisabled=false, size="md", radius="full", variant="solid", isLoading=false, children}) => {

  return (
    <Button
        type={type}
        onPress={onPress}
        onClick={onClick}
        fullWidth={fullWidth ? fullWidth : false}
        aria-label={ariaLable}
        isIconOnly={isIconOnly}
        startContent={startContent} 
        endContent={endContent} 
        size={size}
        radius={radius}
        isLoading={isLoading}
        isDisabled={isDisabled}
        variant={variant}
        color={color}
        className={`${className} font-medium text-medium`}
    >{children}</Button>
  )
}

export default PrimaryButton;