package hmaidi.ats.service;

import hmaidi.ats.entity.Task;
import hmaidi.ats.repository.TaskRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    private Task task;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        task = new Task("Titre Test", "Description Test", LocalDate.now().plusDays(1), false);
        task.setId(1L);
    }

    @Test
    void testFindAll() {
        when(taskRepository.findAll()).thenReturn(List.of(task));

        List<Task> tasks = taskService.findAll();

        assertEquals(1, tasks.size());
        assertEquals("Titre Test", tasks.get(0).getTitle());
    }

    @Test
    void testFindById_Success() {
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        Task found = taskService.findById(1L);

        assertNotNull(found);
        assertEquals(1L, found.getId());
    }

    @Test
    void testFindById_NotFound() {
        when(taskRepository.findById(2L)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> taskService.findById(2L));
    }

    @Test
    void testCreate() {
        when(taskRepository.save(task)).thenReturn(task);

        Task saved = taskService.create(task);

        assertNotNull(saved);
        assertEquals("Titre Test", saved.getTitle());
    }

    @Test
    void testUpdateTask_Success() {
        Task updatedTask = new Task("Titre Modifié", "Desc Modifiée", LocalDate.now().plusDays(2), true);
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenReturn(updatedTask);

        Task result = taskService.updateTask(1L, updatedTask);

        assertEquals("Titre Modifié", result.getTitle());
        assertTrue(result.isCompleted());
    }

    @Test
    void testUpdateTask_NotFound() {
        Task updatedTask = new Task("Titre Modifié", "Desc Modifiée", LocalDate.now().plusDays(2), true);
        when(taskRepository.findById(5L)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> taskService.updateTask(5L, updatedTask));
    }

    @Test
    void testDelete() {
        doNothing().when(taskRepository).deleteById(1L);

        taskService.delete(1L);

        verify(taskRepository, times(1)).deleteById(1L);
    }
}
