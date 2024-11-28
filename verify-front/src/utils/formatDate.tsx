export const formatDate = (date: string) => {
    if (!date) return '';
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return '';
    const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };
    return new Intl.DateTimeFormat('pt-BR', options).format(parsedDate);
};