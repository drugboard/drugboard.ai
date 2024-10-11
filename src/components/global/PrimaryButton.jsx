"use client";
import { Button } from '@nextui-org/button';

const PrimaryButton = ({type, onClick, className, ariaLable, isIconOnly=false, startContent, endContent, isDisabled=false, size="md", radius="full", variant="solid", isLoading=false, children}) => {

  return (
    <Button
        type={type}
        onClick={onClick}
        aria-label={ariaLable}
        isIconOnly={isIconOnly}
        startContent={startContent} 
        endContent={endContent} 
        size={size}
        radius={radius}
        isLoading={isLoading}
        isDisabled={isDisabled}
        variant={variant}
        color="secondary"
        className={className}
    >{children}</Button>
  )
}

export default PrimaryButton;