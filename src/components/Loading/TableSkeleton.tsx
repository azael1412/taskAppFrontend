import { FC } from 'react'

import {
  Paper,
  Box,
  Skeleton,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@mui/material'
import { Add } from '@mui/icons-material'

const TableSkeleton: FC = () => {
  const rows = 10 // Número de filas simuladas en la tabla
  const columns = 5 // Número de columnas en la tabla

  return (
    <Paper>
      <Box mx={3}>
        {/* Barra de búsqueda y botón */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom={2}
        >
          {/* Input de búsqueda */}
          <Box display="flex" alignItems="center" flexGrow={1}>
            <Skeleton variant="rectangular" width="100%" height={56} />
          </Box>

          {/* Botón de Registrar */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            disabled
            style={{ marginLeft: '1rem' }}
          >
            <Skeleton variant="text" width={100} />
          </Button>
        </Box>

        {/* Tabla con Skeleton */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {Array.from({ length: columns }).map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton variant="text" width="80%" />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: rows }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array.from({ length: columns }).map((_, colIndex) => (
                    <TableCell key={colIndex}>
                      <Skeleton variant="text" width="90%" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginación con Skeleton */}
        <TablePagination
          component="div"
          count={10} // Número simulado de páginas
          page={0}
          rowsPerPage={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
          ActionsComponent={() => (
            <Skeleton variant="rectangular" width={200} height={40} />
          )}
        />
      </Box>
    </Paper>
  )
}

export default TableSkeleton
