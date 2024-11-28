export default function Scroll(elementId: string) {
    const contactElement = document.getElementById(elementId);
    if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
    }
}
