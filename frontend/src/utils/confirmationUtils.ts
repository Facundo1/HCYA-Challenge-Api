import Swal from 'sweetalert2';

export const confirmDeleteProduct = async (productName: string): Promise<boolean> => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: `Estás a punto de eliminar "${productName}". Esta acción no se puede deshacer.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  });

  return result.isConfirmed;
};

export const confirmUnsavedChanges = async (): Promise<boolean> => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'Los cambios no guardados se perderán.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, salir',
    cancelButtonText: 'No, quedarme',
  });

  return result.isConfirmed;
};
