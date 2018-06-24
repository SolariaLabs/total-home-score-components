export const isDebugEnabled = () =>
  localStorage.getItem('ths_widget.debug') || false;

export const log = (message: string) =>
  (isDebugEnabled() && console.log(message));
