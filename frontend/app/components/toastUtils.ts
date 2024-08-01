import { toast } from 'react-toastify';

export const showToastSuccess = (message: string) => {
    toast.success(message);
};

export const showToastError = (message: string) => {
    toast.error(message);
};

export const showToastInfo = (message: string) => {
    toast.info(message);
};

export const showToastWarning = (message: string) => {
    toast.warn(message);
};