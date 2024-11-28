"use client";

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Button, Textarea, TextInput } from '@tremor/react';

const schema = z.object({
  firstName: z.string().min(1, "O Primeiro Nome é obrigatório"),
  lastName: z.string().min(1, "O Sobrenome é obrigatório"),
  phoneNumber: z.string().min(1, "O Número de Telefone é obrigatório"),
  jobTitle: z.string().min(1, "O Cargo é obrigatório"),
  email: z.string().email("E-mail inválido").min(1, "O E-mail Empresarial é obrigatório"),
  companyName: z.string().min(1, "O Nome da Empresa é obrigatório"),
  industry: z.string().min(1, "O Setor de Contato é obrigatório"),
  message: z.string().min(1, "A Mensagem é obrigatória"),
  country: z.string().min(1, "O País de Contato é obrigatório"),
  verifications: z.string().min(1, "As Verificações Estimadas Anualmente são obrigatórias"),
});

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Formulário enviado com sucesso!");
      } else {
        alert("Houve um erro ao enviar o formulário.");
      }
    } catch (error) {
      alert("Erro ao enviar o formulário.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-7xl mx-auto p-8 space-y-8 bg-white rounded-lg shadow-lg border border-gray-200 mt-10"
      id='contact'
    >
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Fale Conosco</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Primeiro Nome *</label>
          <TextInput
            type="text"
            placeholder="Digite seu primeiro nome"
            {...register('firstName')}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${errors.firstName ? 'border-red-500' : ''}`}
          />
          {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Sobrenome *</label>
          <TextInput
            type="text"
            placeholder="Digite seu sobrenome"
            {...register('lastName')}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${errors.lastName ? 'border-red-500' : ''}`}
          />
          {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Número de Telefone *</label>
          <TextInput
            type="text"
            placeholder="Digite seu número de telefone"
            {...register('phoneNumber')}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${errors.phoneNumber ? 'border-red-500' : ''}`}
          />
          {errors.phoneNumber && <p className="text-red-600 text-sm mt-1">{errors.phoneNumber.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cargo *</label>
          <TextInput
            type="text"
            placeholder="Digite seu cargo"
            {...register('jobTitle')}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${errors.jobTitle ? 'border-red-500' : ''}`}
          />
          {errors.jobTitle && <p className="text-red-600 text-sm mt-1">{errors.jobTitle.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail Empresarial *</label>
          <TextInput
            type="email"
            placeholder="Digite seu e-mail empresarial"
            {...register('email')}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Nome da Empresa *</label>
          <TextInput
            type="text"
            placeholder="Digite o nome da empresa"
            {...register('companyName')}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${errors.companyName ? 'border-red-500' : ''}`}
          />
          {errors.companyName && <p className="text-red-600 text-sm mt-1">{errors.companyName.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Setor de Contato *</label>
          <select
            {...register('industry')}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${errors.industry ? 'border-red-500' : ''}`}
          >
            <option value="">Selecione</option>
            <option value="Tecnologia">Tecnologia</option>
            <option value="Financeiro">Financeiro</option>
            <option value="Saúde">Saúde</option>
          </select>
          {errors.industry && <p className="text-red-600 text-sm mt-1">{errors.industry.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Verificações Estimadas Anualmente *</label>
          <TextInput
            type="text"
            placeholder="Digite o número de verificações estimadas"
            {...register('verifications')}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${errors.verifications ? 'border-red-500' : ''}`}
          />
          {errors.verifications && <p className="text-red-600 text-sm mt-1">{errors.verifications.message as string}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Mensagem *</label>
          <Textarea
            placeholder="Digite sua mensagem"
            {...register('message')}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${errors.message ? 'border-red-500' : ''}`}
          />
          {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message.message as string}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">País de Contato *</label>
        <TextInput
          type="text"
          value="Brasil"
          {...register('country')}
          readOnly
          className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500`}
        />
        {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country.message as string}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className='mt-6 w-full py-3 bg-primary-600 text-white font-semibold rounded-md shadow-md hover:bg-primary-700 transition-colors duration-200'
      >
        {isSubmitting ? (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-4 h-4 border-2 border-t-2 border-white rounded-full animate-spin"></div>
            <span>Enviando...</span>
          </div>
        ) : 'Enviar'}
      </Button>
    </form>
  );
}
