export const copyToClipboard = (text: string): void => {
  const textarea = document.createElement("textarea");

  textarea.value = text;

  textarea.style.position = "fixed";
  textarea.style.opacity = "0";

  document.body.appendChild(textarea);

  textarea.select();

  document.execCommand("copy");

  document.body.removeChild(textarea);
};
