import { Col, ColGrid, Metric, Text, Card, Block, BarChart, BarList, Bold, Toggle, ToggleItem, LineChart, Flex, AreaChart, ProgressBar, Subtitle, BadgeDelta } from '@tremor/react';
import './App.css';
import { useState } from 'react';
import BarChartData from '../src/dummyJson/BarChartData'
import BarListData from '../src/dummyJson/BarListData'

function App() {
  const [activeChart, setActiveChart] = useState('Bar Chart')
  const [categories, setCategories] = useState(["Monthly Active Users"])

  const renderChart = (chart) => {
    if(chart === 'Bar Chart'){
      return <BarChart
              data={BarChartData}
              showLegend={true}
              dataKey="month"
              
              categories={categories}
              marginTop="mt-6"
            />
    }

    if(chart === 'Line Chart') {
      return <LineChart
                data={BarChartData}
                showLegend={true}
                dataKey="month"
                categories={categories}
                marginTop="mt-6"
              />
    }

    if(chart === 'Area Chart') {
      return <AreaChart
                data={BarChartData}
                showLegend={true}
                dataKey="month"
                categories={categories}
                marginTop="mt-6"
              />
    }
  }

  const handleCompare = (compare) => {
    compare ? setCategories(["Monthly Active Users", "Monthly Active Users Last Year"]) : setCategories(["Monthly Active Users"])
  }
  
  return (
    <div className="App p-6 bg-slate-50 h-full">
      <p className='text-lg'>Dashboard</p>
      <ColGrid numColsSm={2} numColsLg={4} gapX="gap-x-6" gapY="gap-y-6" marginTop='mt-6'>
        <Col numColSpan={3}>
          <Card>
            <Flex
              justifyContent="justify-between"
            >
              <Toggle defaultValue={activeChart} handleSelect={(value)=> setActiveChart(value)}>
                <ToggleItem
                  value={'Bar Chart'}
                  text="Bar Chart"
                />
                <ToggleItem
                  value={'Line Chart'}
                  text="Line Chart"
                />
                <ToggleItem
                  value={'Area Chart'}
                  text="Area Chart"
                />
              </Toggle>
              <Flex justifyContent='justify-end'>
                <span className='mr-4'>vs. last year</span>
                <Toggle defaultValue={false} handleSelect={(val)=>{handleCompare(val)}}>
                  <ToggleItem value={true} text="On" />
                  <ToggleItem value={false} text="Off" />
                </Toggle>
              </Flex>
            </Flex>
            {renderChart(activeChart)}
          </Card>
        </Col>
        <Col numColSpan={1}>
          <Block spaceY="space-y-6">
            <Card>
              <Flex justifyContent='justify-between'>
                <Text>Users</Text>
                <span className='text-gray-400'>Milestone</span>
              </Flex>
              <Flex justifyContent='justify-between'>
              <Metric>30,000</Metric>
              <Subtitle>/ 250,000</Subtitle>
              </Flex>
              <ProgressBar percentageValue={(30000/250000)*100} marginTop="mt-6"/>
            </Card>
            <Card>
              <Text>Growth 24h</Text>
              <Flex justifyContent='justify-start'>
                <Metric marginTop='mt-6'>+17.43%</Metric>
                <BadgeDelta deltaType='moderateIncrease'/>
              </Flex>
              <Flex marginTop='mt-6'>
                <Block>
                  <Text>7d</Text>
                  <BadgeDelta
                    text="1.32%"
                    deltaType='moderateDecrease'
                    size="xs"
                    marginTop='mt-6'
                  />
                </Block>
                <Block>
                  <Text>30d</Text>
                  <BadgeDelta
                    text="9.71%"
                    deltaType='moderateIncrease'
                    isIncreasePositive={true}
                    size="xs"
                    marginTop='mt-6'
                  />
                </Block>
                <Block>
                  <Text>90d</Text>
                  <BadgeDelta
                    text="163.85%"
                    deltaType='increase'
                    isIncreasePositive={true}
                    size="xs"
                    marginTop='mt-6'
                  />
                </Block>
              </Flex>
            </Card>
          </Block>
        </Col>
        <Col numColSpan={2}>
          <Card>
            <Bold>Users by Location</Bold>
            <BarList
              data={BarListData}
              marginTop="mt-6"
            />
          </Card>
        </Col>
      </ColGrid>
    </div>
  );
}

export default App;
