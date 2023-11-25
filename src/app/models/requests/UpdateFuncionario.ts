export class UpdateFuncionario {
  direccion: string
  email: string
  telefono: string
  password: string

  constructor(direccion: string, email: string, telefono: string, password: string) {
    this.direccion = direccion;
    this.email = email;
    this.telefono = telefono;
    this.password = password;
  }
}
