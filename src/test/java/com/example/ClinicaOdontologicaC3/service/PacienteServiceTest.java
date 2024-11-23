package com.example.ClinicaOdontologicaC3.service;

import com.example.ClinicaOdontologicaC3.Dto.TurnoDTO;
import com.example.ClinicaOdontologicaC3.Entity.Turno;
import com.example.ClinicaOdontologicaC3.Entity.Odontologo;
import com.example.ClinicaOdontologicaC3.Entity.Paciente;
import com.example.ClinicaOdontologicaC3.Repository.TurnoRepository;
import com.example.ClinicaOdontologicaC3.Service.TurnoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TurnoServiceTest {

    @Mock
    private TurnoRepository turnoRepository;

    @InjectMocks
    private TurnoService turnoService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegistrarTurno() {
        // Arrange
        Odontologo odontologo = new Odontologo();
        odontologo.setId(1L);
        odontologo.setNombre("Dra. Carmela Rodríguez");

        Paciente paciente = new Paciente();
        paciente.setId(1L);
        paciente.setNombre("José Luis Martínez");

        Turno turno = new Turno();
        turno.setId(1L);
        turno.setFecha(LocalDate.from(LocalDateTime.now()));
        turno.setOdontologo(odontologo);
        turno.setPaciente(paciente);

        when(turnoRepository.save(any(Turno.class))).thenReturn(turno);

        // Act
        TurnoDTO result = turnoService.registrarTurno(turno);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals(1L, result.getOdontologoId());
        assertEquals(1L, result.getPacienteId());
        verify(turnoRepository, times(1)).save(turno);
    }

    @Test
    void testListarTodos() {
        // Arrange
        Odontologo odontologo1 = new Odontologo();
        odontologo1.setId(1L);
        odontologo1.setNombre("Dr. Fernando López");

        Odontologo odontologo2 = new Odontologo();
        odontologo2.setId(2L);
        odontologo2.setNombre("Dra. Isabella Gómez");

        Paciente paciente1 = new Paciente();
        paciente1.setId(1L);
        paciente1.setNombre("María Fernanda Castro");

        Paciente paciente2 = new Paciente();
        paciente2.setId(2L);
        paciente2.setNombre("Juan Carlos Herrera");

        Turno turno1 = new Turno();
        turno1.setId(1L);
        turno1.setFecha(LocalDate.from(LocalDateTime.now()));
        turno1.setOdontologo(odontologo1);
        turno1.setPaciente(paciente1);

        Turno turno2 = new Turno();
        turno2.setId(2L);
        turno2.setFecha(LocalDate.from(LocalDateTime.now().plusDays(1)));
        turno2.setOdontologo(odontologo2);
        turno2.setPaciente(paciente2);

        List<Turno> turnos = Arrays.asList(turno1, turno2);

        when(turnoRepository.findAll()).thenReturn(turnos);

        // Act
        List<TurnoDTO> result = turnoService.listarTodos();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(1L, result.get(0).getId());
        assertEquals(2L, result.get(1).getId());
        verify(turnoRepository, times(1)).findAll();
    }

    @Test
    void testActualizarTurno() {
        // Arrange
        Odontologo odontologo = new Odontologo();
        odontologo.setId(1L);
        odontologo.setNombre("Dra. Valentina Morales");

        Paciente paciente = new Paciente();
        paciente.setId(1L);
        paciente.setNombre("Santiago Vargas");

        Turno turno = new Turno();
        turno.setId(1L);
        turno.setFecha(LocalDate.from(LocalDateTime.now()));
        turno.setOdontologo(odontologo);
        turno.setPaciente(paciente);

        // Act
        turnoService.actualizarTurno(turno);

        // Assert
        verify(turnoRepository, times(1)).save(turno);
    }

    @Test
    void testEliminarTurno() {
        // Arrange
        Long turnoId = 1L;

        // Act
        turnoService.eliminarTurno(turnoId);

        // Assert
        verify(turnoRepository, times(1)).deleteById(turnoId);
    }
}