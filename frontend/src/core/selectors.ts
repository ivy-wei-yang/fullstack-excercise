export const getSuccess = (state: any) => state.notification.success;
export const getError = (state: any) => state.notification.error;
export const getWarning = (state: any) => state.notification.warning;
export const getInfo = (state: any) => state.notification.info;

export const getModal = (state: any, name: string) =>
    state.modal[name] || false;
