import jsPDF from "jspdf";

export function generatePdf(isPessoaFisica: boolean, data: any) {
    const doc = new jsPDF();
    const startY = 10;
    let currentY = startY;

    const addDataToPdf = (obj: any, indentLevel = 0) => {
        const indent = 10 * indentLevel;
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];

                if (typeof value === "object" && value !== null) {
                    doc.text(`${' '.repeat(indent)}${key}:`, 10, currentY);
                    currentY += 10;
                    addDataToPdf(value, indentLevel + 1);
                } else {
                    doc.text(`${' '.repeat(indent)}${key}: ${value}`, 10, currentY);
                    currentY += 10;
                }
                if (currentY > 280) {
                    doc.addPage();
                    currentY = startY;
                }
            }
        }
    };

    if (isPessoaFisica) {
        doc.text("Pessoa Física", 10, currentY);
        currentY += 10;
    } else {
        doc.text("Pessoa Jurídica", 10, currentY);
        currentY += 10;
    }

    addDataToPdf(data);

    doc.save(isPessoaFisica ? "Verify_Pessoa_Fisica.pdf" : "Verify_Pessoa_Juridica.pdf");
}
