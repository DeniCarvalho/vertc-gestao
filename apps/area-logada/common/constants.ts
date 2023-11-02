export const routes = {
  login: '/login',
  register: '/cadastro',
  forgotPassword: '/esqueci-minha-senha',
  app: '/',
  emissions: '/emissoes',
  allEmissions: '/todas-emissoes',
  emissionDetail: '/{emissionId}',
  seriesDetail: '/{emissionId}/series/{serieId}',
  documentsDetail: '/{emissionId}/documentos',
  restrictedDocumentsDetail: '/{emissionId}/documentos-restritos',
  cashFlowDetail: '/{emissionId}/caixas',
  underlyingAssetsDetail: '/{emissionId}/lastros',
  indexes: '/indices',
  contact: '/contato',
};

export const errors = {
  required: 'Campo obrigatório',
  invalid_email: 'E-mail inválido',
};
