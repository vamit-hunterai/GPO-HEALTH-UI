/**
 * Author: Lakshman Veti
 * Type: Config
 * Objective: To provide error messages throughout app
 * Associated Route/Usage: Global
*/


const errorMessages = {
  common:{
      unavailable: 'Service unavailbe, try again.',
      required:'Field cannot be blank.',
      pastDate:'Date should be greater or equal than current date',
      clear: 'Sure you want to clear the form?',
      reset: 'Sure you want to reset the form?',
      delete: 'Sure you want to delete?'
  },
  save:{
    success:'Saved Successfully',
    failure: 'Unable to save, try again!'
  },
  update:{
    success:'Updated Successfully',
    failure: 'Unable to update, try again!'
  },
  delete:{
    success:'Deleted Successfully',
    failure: 'Unable to delete, try again!'
  },
  upload:{
    success:'File(s) uploaded successfully',
    failure: 'Unable to upload, try again!'
  }

};


export default errorMessages;
