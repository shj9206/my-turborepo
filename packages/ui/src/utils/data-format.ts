export const formatPrice = (price?: number) => {
  if (!price) return null;
  return new Intl.NumberFormat("ko-KR").format(price);
};

export const formatDate = (dateString?: string) => {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};
