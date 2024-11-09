import React, { useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FaExclamationCircle, FaExclamationTriangle, FaRegTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button"

export default function ConfirmModal({
    isOpen,
    setIsOpen,
    title,
    message,
    type=null,
    action,
}) {

    return (
        <Dialog open={isOpen} >
            <DialogContent>
                <Card className="border-none shadow-none" >
                    <CardHeader className="flex justify-center items-center">
                        <ModalIcon type={type} />
                        <h1>{title ?? 'Are you sure?'}</h1>
                    </CardHeader>
                    <CardContent>
                        <p className='text-center'>{message ?? 'Are you sure you want to do this action?'}</p>
                    </CardContent>
                    <CardFooter className="flex justify-center gap-2 items-center p-0" >
                        <Button className={`w-full text-white hover:${ModaBgColor(type)} ${ModaBgColor(type)}`} variant="destructive" onClick={action}>
                            Delete
                        </Button>
                        <Button className="w-full" variant="ghost" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                    </CardFooter>
                </Card>
            </DialogContent>
        </Dialog>
    )
}

const ModalTextColor = (type) => {
    if (type === 'error') return 'text-red-500';
    else if (type === 'Warning') return 'text-yellow-500';
    else return 'text-blue-500';
}


const ModaBgColor = (type) => {
    if (type === 'error') return 'bg-red-500';
    else if (type === 'Warning') return 'bg-yellow-500';
    else return 'bg-blue-500';
}

const ModalIcon = (type) => {
    if (type === 'warning') {
        return <FaExclamationTriangle size={50} className={ModalTextColor(type)} />
    }

    return <FaExclamationCircle size={50} className={ModalTextColor(type)} />
}
