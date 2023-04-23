const ingresos = [
  new Ingreso('Salario', 2100.00),
  new Ingreso('Venta coche', 1500)
];

const egresos = [
  new Egreso('Renta departamento', 900),
  new Egreso('Ropa', 400)
];

const cargarApp = () => {
  cargarCabecero()
  cargarIngresos()
  cargarEgresos()
}

const totalIngresos = () => {
  let totalIngreso = 0;

  ingresos.forEach(ingreso => totalIngreso += ingreso.valor);

  return totalIngreso;
}

const totalEgresos = () => {
  let totalEgreso = 0;

  egresos.forEach(egreso => totalEgreso += egreso.valor);

  return totalEgreso;
}

const cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcentajeEgreso = totalEgresos() / totalIngresos();

  document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
  document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
  document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
  document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor) => {
  return valor.toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2})
}

const formatoPorcentaje = (valor) => {
  return valor.toLocaleString('en-US', { style: 'percent', currency: 'USD', minimumFractionDigits: 2 })
}

const cargarIngresos = () => {
  let ingresosHTML = '';

  ingresos.forEach(ingreso => ingresosHTML += crearIngresoHTML(ingreso));

  document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) => (`
  <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
      <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
      <div class="elemento_eliminar">
        <button onclick="eliminarIngreso(${ingreso.id})" class="elemento_eliminar--btn">
          <ion-icon name="close-circle-outline"></ion-icon>
        </button>
      </div>
    </div>
  </div>
  `);

const cargarEgresos = () => {
  let egresosHTML = '';

  egresos.forEach(egreso => egresosHTML += crearEgresoHTML(egreso));

  document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) => (`
  <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
      <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
      <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor / (totalEgresos() + totalIngresos()))}</div>
      <div class="elemento_eliminar">
        <button onclick="eliminarEgreso(${egreso.id})" class="elemento_eliminar--btn">
          <ion-icon name="close-circle-outline"></ion-icon>
        </button>
      </div>
    </div>
  </div>
  `);

  const eliminarIngreso = (id) => {
    const indiceEliminar = ingresos.findIndex((ingreso) => ingreso.id === id);

    ingresos.splice(indiceEliminar, 1);

    cargarCabecero();
    cargarIngresos();
  }

const eliminarEgreso = (id) => {
  const indiceEliminar = egresos.findIndex((egreso) => egreso.id === id);

  egresos.splice(indiceEliminar, 1);

  cargarCabecero();
  cargarEgresos();
}

const agregarDato = () => {
  const formulario = document.forms['forma'];
  const tipo = formulario['tipo'];
  const descripcion = formulario['descripcion'];
  const valor = formulario['valor'];

  if (descripcion.value.trim() !== '' && valor.value.trim() !== ''){

    cargarCabecero();

    if (tipo.value === 'ingreso'){

      ingresos.push(new Ingreso(descripcion.value, +valor.value));

      cargarIngresos();

    }else if (tipo.value === 'egreso') {

      egresos.push(new Egreso(descripcion.value, +valor.value));

      cargarEgresos()

    }

    valor.value = ''
    descripcion.value = ''
    descripcion.focus()
  }
}