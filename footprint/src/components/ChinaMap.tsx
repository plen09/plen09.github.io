import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { TravelEntry } from '../types';

interface ChinaMapProps {
  entries: TravelEntry[];
  onCityClick: (city: string) => void;
}

const ChinaMap: React.FC<ChinaMapProps> = ({ entries, onCityClick }) => {
  const [mapData, setMapData] = useState<any>(null);

  useEffect(() => {
    // Fetch China GeoJSON
    fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
      .then(res => res.json())
      .then(data => {
        echarts.registerMap('china', data);
        setMapData(data);
      });
  }, []);

  if (!mapData) return (
    <div className="w-full h-[600px] flex items-center justify-center bg-gray-50/50 rounded-3xl animate-pulse">
      <p className="text-gray-400 font-medium">加载地图中...</p>
    </div>
  );

  // Group entries by province for filling colors
  const provinceData = entries.reduce((acc: any[], entry) => {
    const existing = acc.find(p => p.name === entry.province);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: entry.province, value: 1 });
    }
    return acc;
  }, []);

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        if (params.seriesType === 'effectScatter') {
          return `${params.data.city}: ${params.data.title}`;
        }
        return `${params.name}: ${params.value || 0} 个足迹`;
      },
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#eee',
      borderWidth: 1,
      textStyle: { color: '#333' },
      padding: [10, 15],
      borderRadius: 8
    },
    geo: {
      map: 'china',
      roam: true,
      zoom: 1.2,
      center: [104.114129, 37.550339], // Center of China
      emphasis: {
        itemStyle: {
          areaColor: '#f3f4f6'
        },
        label: {
          show: false
        }
      },
      itemStyle: {
        areaColor: '#ffffff',
        borderColor: '#e5e7eb',
        borderWidth: 1
      },
      select: {
        itemStyle: {
          areaColor: '#f9fafb'
        }
      }
    },
    series: [
      {
        name: '足迹分布',
        type: 'map',
        geoIndex: 0,
        data: provinceData
      },
      {
        name: '足迹点',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: entries.map(entry => ({
          name: entry.city,
          value: [...entry.coordinates, 10],
          city: entry.city,
          title: entry.title,
          id: entry.id
        })),
        symbolSize: (val: any) => val[2],
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',
          scale: 4,
          period: 4
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: false
        },
        itemStyle: {
          color: '#1a1a1a',
          shadowBlur: 10,
          shadowColor: '#333'
        },
        emphasis: {
          scale: true,
          label: {
            show: true,
            color: '#1a1a1a',
            fontWeight: 'bold',
            fontSize: 14,
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: [4, 8],
            borderRadius: 4
          }
        },
        zlevel: 1
      },
      // Line from Beijing (The baseline as requested)
      {
        name: '出发线',
        type: 'lines',
        zlevel: 2,
        effect: {
          show: true,
          period: 6,
          trailLength: 0.7,
          color: '#3b82f6',
          symbolSize: 3
        },
        lineStyle: {
          color: '#3b82f6',
          width: 1,
          opacity: 0.2,
          curveness: 0.2
        },
        data: entries
          .filter(e => e.city !== '北京')
          .map(e => ({
            fromName: '北京',
            toName: e.city,
            coords: [
              [116.4074, 39.9042], // Beijing
              e.coordinates
            ]
          }))
      }
    ],
    visualMap: {
      min: 0,
      max: 5,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'],
      calculable: true,
      inRange: {
        color: ['#f8fafc', '#d1d5db', '#1a1a1a']
      },
      show: false
    }
  };

  return (
    <div className="w-full h-full min-h-[500px]">
      <ReactECharts 
        option={option} 
        style={{ height: '100%', width: '100%' }}
        onEvents={{
          'click': (params: any) => {
            if (params.componentType === 'series' && params.seriesType === 'effectScatter') {
              onCityClick(params.data.city);
            }
          }
        }}
      />
    </div>
  );
};

export default ChinaMap;
