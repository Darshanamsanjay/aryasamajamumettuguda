/** Shared booking form data shape */
export interface BookingFormData {
  preferredDate: string;
  preferredTime: string;
  groomName: string;
  brideName: string;
  mobileNumber: string;
  location: string;
  additionalNotes: string;
}

/** Initial / empty form state */
export const EMPTY_FORM: BookingFormData = {
  preferredDate: "",
  preferredTime: "",
  groomName: "",
  brideName: "",
  mobileNumber: "",
  location: "",
  additionalNotes: "",
};
