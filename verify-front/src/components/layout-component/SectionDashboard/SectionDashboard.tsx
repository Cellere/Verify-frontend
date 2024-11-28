export default function SectionDashboard({ consultationType, price }: { consultationType: string, price: number }) {
    const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);

    return (
        <section className="space-y-4">
            <h2 className="text-xl font-bold text-center text-gray-800">
                Faça sua {consultationType}
            </h2>
            <p className="text-center text-gray-600">
                Realize uma verifição utilizando nosso sistema de verificação de dados. <br />
                Preencha os dados abaixo e, após a verificação, você receberá um
                relatório detalhado em formato PDF.
            </p>
            <p className="text-center text-gray-600">
                <strong className="text-gray-800">Preço:</strong> {formattedPrice} por formulário.
            </p>
        </section>
    );
}
