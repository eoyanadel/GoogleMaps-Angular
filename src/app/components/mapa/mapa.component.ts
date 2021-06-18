import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Marcador } from '../../classes/marcador.class';
import { MatDialog } from '@angular/material/dialog';
import { MapaEditarComponent } from '../mapa-editar/mapa-editar.component';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  lat = 51.678418;
  lng = 7.809007;

  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog) {

   /*  const nuevoMarcador = new Marcador(51.678418, 7.809007);
    this.marcadores.push(nuevoMarcador); */

    if (localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
  }

  ngOnInit(): void {
  }


  guardarStorage(): void {

    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }


  agregarMarcador(evento): void {

    const coords = evento.coords;

    const nuevoMarcador = new Marcador(coords.lat, coords.lng);
    this.marcadores.push(nuevoMarcador);

    this.guardarStorage();

    this.snackBar.open('Marcador Agregado', 'Cerrar', { duration: 3000 });

  }


  borrarMarcador(i: number): void {

    this.marcadores.splice(i, 1);
    this.guardarStorage();

    this.snackBar.open('Marcador Eliminado', 'Cerrar', { duration: 3000 });
  }


  editarMarcador(marcador: Marcador): void {

    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: {titulo: marcador.titulo, desc: marcador.desc}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // console.log(result);

      if (!result) {
        return;
      }

      marcador.titulo = result.titulo;
      marcador.desc = result.desc;

      this.guardarStorage();
      this.snackBar.open('Marcador Actualizado', 'Cerrar', { duration: 3000 });
    });
  }

}
