export const validateName = (name) => {
  return name.trim() !== '' ? '' : 'يرجى ادخال الاسم';
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? '' : 'يرجى ادخال بريد الكتروني صحيح';
};

export const validateMobile = (mobile) => {
  const mobileRegex = /^[0-9]{11}$/;
  return mobileRegex.test(mobile) ? '' : 'يرجى ادخال رقم موبايل صحيح المكون من 11 أرقام';
};

export const validateSpecialty = (value) => {
  if (!value) {
    return 'الرجاء اختيار التخصص';
  }
  return '';
};

export const validateProvince = (value) => {
  if (!value) {
    return 'يرجى اختيار المحافظه';
  }
  return '';
};

export const validateArea = (value) => {
  if (!value) {
    return 'يرجى اختيار المنطقه';
  }
  return '';
};



export const validateAdrress= (value) => {
  if (!value) {
    return 'ادخل عنوان ';
  }
  return '';
};


