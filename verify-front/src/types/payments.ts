interface User {
    id: number;
    email: string;
    name: string;
    password: string;
  }

export enum QueryType {
    Simples = 'Consulta Simples',
    Intermediaria = 'Consulta Intermediária',
    Avancada = 'Consulta Avançada',
    Automotiva = 'Consulta Automotiva',
  }
  
 export interface PaymentQuery {
    id: number;
    queryType: QueryType;
    queryName?: string;
    queryCpfOrCpnj: string;
    amount: number;
    natural: string
    createdAt: string; 
    user: User;
    pdfUrl: string
  }