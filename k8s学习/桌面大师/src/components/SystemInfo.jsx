import React from 'react';
import PropTypes from 'prop-types';

const SystemInfo = ({ data }) => {
  return (
    <div className="system-info">
      <div className="info-section">
        <h2>CPU 信息</h2>
        <p>型号: {data.cpu.model}</p>
        <p>核心数: {data.cpu.cores}</p>
        <p>频率: {data.cpu.speed} GHz</p>
      </div>

      <div className="info-section">
        <h2>内存信息</h2>
        <p>总内存: {data.memory.total} GB</p>
        <p>可用内存: {data.memory.free} GB</p>
      </div>

      <div className="info-section">
        <h2>磁盘信息</h2>
        {data.disks.map((disk, index) => (
          <div key={index} className="disk-info">
            <p>磁盘 {index + 1}: {disk.name}</p>
            <p>容量: {disk.size} GB</p>
            <p>可用空间: {disk.free} GB</p>
          </div>
        ))}
      </div>
    </div>
  );
};

SystemInfo.propTypes = {
  data: PropTypes.shape({
    cpu: PropTypes.shape({
      model: PropTypes.string.isRequired,
      cores: PropTypes.number.isRequired,
      speed: PropTypes.number.isRequired
    }),
    memory: PropTypes.shape({
      total: PropTypes.number.isRequired,
      free: PropTypes.number.isRequired
    }),
    disks: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        size: PropTypes.number.isRequired,
        free: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired
};

export default SystemInfo;
