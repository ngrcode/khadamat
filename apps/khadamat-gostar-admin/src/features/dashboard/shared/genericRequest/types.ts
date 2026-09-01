export type GenericRequestFormValues = {
  personnelCode: string;
  subject: string;
  description: string;
  phoneNumber: string;
};

export type RequestModalProps = {
  open: boolean;
  onClose: () => void;
};
