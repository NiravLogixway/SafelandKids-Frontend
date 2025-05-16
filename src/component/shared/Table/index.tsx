import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {DataTable} from 'react-native-paper';
import Typography from '../Typography';

interface IColumnProps {
  label: string;
  name: string;
  render?: (item: any) => React.ReactNode;
  tableCellStyle?: any;
}
interface ITableProps {
  columns: IColumnProps[];
  data: any[];
}

const Table = ({columns, data}: ITableProps) => {
  const renderRow = (row: any, rowId: number) => (
    <DataTable.Row key={`row-${rowId}`} style={styles.tableRow}>
      {columns.map((column, index) => (
        <DataTable.Cell key={`cell-${index}-${rowId}`} style={column.tableCellStyle}>
          <Typography variant="body2">
            {column.render ? column.render(row) : row[column.name] ?? ''}
          </Typography>
        </DataTable.Cell>
      ))}
    </DataTable.Row>
  );
  return (
    <DataTable style={styles.container}>
      <DataTable.Header style={styles.tableHeader}>
        {columns.map((column: any, index: number) => (
          <DataTable.Title
            key={`column-${index}`}
            style={[column.tableCellStyle, column.headerCellStyle]}>
            <Typography variant="body2" weight={600}>
              {column.label}
            </Typography>
          </DataTable.Title>
        ))}
      </DataTable.Header>
      <ScrollView style={{height: '100%'}}>
        {data.map((row: any, index: number) => renderRow(row, index))}
      </ScrollView>
    </DataTable>
  );
};

export default Table;

const styles = StyleSheet.create({
  container: {},
  tableHeader: {
    backgroundColor: 'rgba(196, 197, 200, 0.10)',
  },
  tableRow: {
    borderTop: '0.5px solid var(--Border, #C4C5C8)',
    borderBottom: '0.5px solid var(--Border, #C4C5C8)',
  },
});
