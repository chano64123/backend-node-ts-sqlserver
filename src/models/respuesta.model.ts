class Respuesta {
  public success: boolean
  public result: any
  public displayMessage: string
  public errorMessage: any

 constructor( success: boolean, result: any, displayMessage: string, errorMessage: any) {
    this.success = success
    this.result = result
    this.displayMessage = displayMessage
    this.errorMessage = errorMessage
  }

  public static getSuccess = (result: any, displayMessage: string): Respuesta => {
    return new Respuesta(true, result, displayMessage, null)
  }
  
  public static getSuccessNoResult = (displayMessage: string): Respuesta => {
    return new Respuesta(true, null, displayMessage, null)
  }

  public static getError = (errorMessage: any, displayMessage: string): Respuesta => {
    return new Respuesta(false, null, displayMessage, errorMessage)
  }

  public static getErrorNoResult = (errorMessage: any, displayMessage: string): Respuesta => {
    return new Respuesta(false, null, displayMessage, errorMessage)
  }

  public static getErrorNoReultNoErrorMessage = (displayMessage: string): Respuesta => {
    return new Respuesta(false, null, displayMessage, null)
  }
}

export default Respuesta
