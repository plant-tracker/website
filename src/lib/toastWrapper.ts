import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

type ToastType = 'error' | 'warning' | 'success' | 'default';

const toastStyles: Record<ToastType, Partial<ToastSettings>> = {
    error: {
        background: 'variant-filled-error',
        classes: 'border-4 border-red-500',
    },
    warning: {
        background: 'variant-filled-warning',
        classes: 'border-4 border-yellow-500',
    },
    success: {
        background: 'variant-filled-success',
        classes: 'border-4 border-green-500',
    },
    default: {},
};

export function showToast(
    message: string,
    type?: ToastType,
    customSettings?: Partial<ToastSettings>,
) {
    const defaultSettings = toastStyles[type || 'default'];
    const settings: ToastSettings = {
        message,
        ...defaultSettings,
        ...customSettings,
    };
    toastStore.trigger(settings);
}
