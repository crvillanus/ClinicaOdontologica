package com.example.ClinicaOdontologicaC3.Controller;

import com.example.ClinicaOdontologicaC3.Entity.Odontologo;
import com.example.ClinicaOdontologicaC3.Entity.Odontologo;
import com.example.ClinicaOdontologicaC3.Exception.CustomBadRequestException;
import com.example.ClinicaOdontologicaC3.Exception.ResourceNotFoundException;
import com.example.ClinicaOdontologicaC3.Service.OdontologoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/odontologo")
public class OdontologoController {
    @Autowired
    private OdontologoService odontologoService;


    @PostMapping
    public ResponseEntity<Odontologo> registrarOdontologo(@RequestBody Odontologo odontologo) throws CustomBadRequestException {
        try {
            Odontologo response = odontologoService.registrarOdontologo(odontologo);
            return ResponseEntity.ok(response);
        }catch (Exception e) {
            throw new CustomBadRequestException("Datos invalidos");
        }
    }

    @GetMapping
    public ResponseEntity<List<Odontologo>> listarTodos(){
        return ResponseEntity.ok(odontologoService.listarTodos());
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<Odontologo> buscarOdontologo(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarPorId(id);
        if (odontologoBuscado.isPresent()) {
            return ResponseEntity.ok(odontologoBuscado.get());
        } else {
            throw new ResourceNotFoundException("Odontologo no encontrado");
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> eliminarOdontologo(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Odontologo> odontologoBuscado=odontologoService.buscarPorId(id);
        if(odontologoBuscado.isPresent()){
            odontologoService.eliminarOdontologo(id);
            return ResponseEntity.ok("odontologo eliminado con exito");
        }else{
            throw new ResourceNotFoundException("odontologo no encontrado");
            //return ResponseEntity.notFound().build();
        }
    }
}
