import React from 'react';
import styled from 'styled-components/native';
import Typography from '@/component/shared/Typography';
import { FlatList, ListRenderItem } from 'react-native';

type Tab = {
  key: string;
  title: string;
};

type TabsProps = {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
};

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  const renderItem: ListRenderItem<Tab> = ({ item }) => (
    <TabItem onPress={() => onTabChange(item.key)} active={item.key === activeTab}>
      <Text variant="body1" active={item.key === activeTab} weight={500}>
        {item.title}
      </Text>
    </TabItem>
  );

  return (
    <Container>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={tabs}
        keyExtractor={(item: Tab) => item.key}
        renderItem={renderItem}
      />
    </Container>
  );
};

export default Tabs;

const Container = styled.View`
  flex-direction: row;
  height: 48px;
`;

type TabItemProps = {
  active?: boolean;
};

const TabItem = styled.TouchableOpacity<TabItemProps>`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 42px;
  border-bottom-width: 2px;
  border-bottom-color: transparent;
  padding: 8px 12px;
  background-color: ${(props) => (props.active ? '#DD0A1D' : '#f2f3f5')};
  color: ${(props) => (props.active ? '#ffffff' : 'transparent')};
  border-radius: 8px;
  margin-right: 8px;
`;

type TextProps = {
  active?: boolean;
};

const Text = styled(Typography) <TextProps>`
  color: ${(props) => (props.active ? '#ffffff' : 'rgba(0,0,0,0.87)')};
`;
