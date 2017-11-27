import { Cliente } from './cliente.class';

/**
 * La clase comercial representa al usuario de la aplicación
 * guarda tods los datos correspondientes a este. Contiene un array 
 * de pedidos que conteine objetos de la clase Clientes. Cada uno 
 * reprsenta un pedido para un cliente.
 * 
 * @author      Carlos Troyano Carmona
 * * @version     %I%, %G%
 * @since       1.0
 * @see Cliente
 */
export class Comercial {
  /**
   * Variable que representa el nombre del usuario que está usando la aplicaión.
   */
    public nombre: String;
  /**
   * Variable que representa el mail del usuario que está usando la aplicaión.
   */
    public mail: String;
    
  /**
   * Variable que representa el codProv, código de la provincia, del usuario que está 
   * usando la aplicaión.
   */
    public provincia: number;
    
  /**
   * Variable la fecha en que el usuario está realizando los pedidos en la aplicación.
   */
    public fecha_pedido: Date; 
  
  /**
   * Array de clientes que contiene los pedidos para cada cliente y tdoa la información 
   * relacionada con este.
   */
    public pedidos: Array<Cliente>;
    
  /**
   * Array constante para transformar el número recibido como tarifa a la letra
   * correspodiente de esa tarifa en la información del producto.
   */
    private arrayTarifasNumeroALetra = ['a', 'b', 'c', 'd', 'e', 'f']
    
  /**
   * ´Constructor´ Constructor de la calse que recibe el nombre del usuario
   * inicializa la fecha y el array de pedidos como un array vacio. Donde más tarde
   * se insertaran los clientes cuando este empieze un peido. Un peido = cliente en 
   * el array.
   * @param nombre nombre del comercial o usuario de la aplicación.
   */
    constructor(nombre){
        this.nombre = nombre;
        this.fecha_pedido = new Date();
        this.pedidos = [];
    };
       
    
    public imprimirPedidos() {
     console.log(this.pedidos) 
    }
    
  /**
   * ´insertarCliente´ Este método inserta un cliente en el array de pedidos
   *  (un pedido = cliente). Filtra el tipo de tarificación y los precios para
   *  un grupo en particular de clientes.
   * @param tipoTarificacion tipo de tarificación para este cliente.
   * @param indiceClienteApp Indice para el cliente en el manejo de la aplicación.
   * @param codigoCliente Código del cliente en la base de datos(clave única).
   * @param nombreCliente El nombre del cliente.
   * @param collapsed Indica si la card que representa al cliente en 
   * la pantalla principal de la aplicación esta expandida mostrando su 
   * información o no
   * @param empezadoPedido Flag que reprsenta si el pedido se ha iniciado.
   * @param todosProductosArray trae todos los productos en un array además
   * de cierta información necesaria para la tarificación.
   * (caso 4 de la jerarquía).
   * @param arrayPreciosParticulares Trae el array que contiene los precios de los casos 
   * 1 y 3 de la jerarquía.
   * @param arrayDescuentosPorTipoCliente Trae el array que contiene los precios por tipo de cliente
   * (caso 2 de la jerarquia)
   */ 
    public insertarCliente(
                            tipoTarificacion,
                            indiceClienteApp,
                            codigoCliente,
                            nombreCliente,
                            collapsed,
                            empezadoPedido,
                            todosProductosArray,
                            arrayPreciosParticulares, 
                            arrayDescuentosPorTipoCliente
                        )     
    {
        this.pedidos.push(
            new Cliente(
                this.arrayTarifasNumeroALetra[tipoTarificacion - 1],
                indiceClienteApp,
                codigoCliente,
                nombreCliente, 
                collapsed,
                empezadoPedido,
                todosProductosArray,
                arrayPreciosParticulares, 
                arrayDescuentosPorTipoCliente
            )
        );
      
    };
    
  /**
   * ´generarPedidos_JSON´ Este método genera el objeto JSON de los pedidos
   * para enviarlo al servidor.
   * @return Objeto Json con los pedidos
   */ 
    public generarPedidos_JSON() {
      let arrayPedidos = [];
      this.pedidos.forEach(function(pedido, index){
        arrayPedidos.push(pedido.generarPedido_JSON());
      });
      return {
        mail:this.mail,
        fecha_pedido:this.fecha_pedido,
        pedidos:arrayPedidos
      };
    }

}