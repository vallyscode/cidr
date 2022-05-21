import { ChangeEvent, useState } from "react";
import CidrContainer, { CidrContainerProps } from "./styles";

export interface CidrProps extends CidrContainerProps {
  addr: number[];
  size: number;
}

function dec2bin(dec: number) {
  return (dec >>> 0).toString(2);
}

function inRange(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function getNetMask(size: number): number {
  if (size === 0) {
    return 0
  }
  const delta = 1 << 31
  let mask = delta
  for (let i = 1; i < size; i++) {
    mask >>= 1
    mask |= delta;
  }
  return mask
}

function fromOctets(octets: number[]): number {
  let result = 0
  result |= (octets[0] << 24)
  result |= (octets[1] << 16)
  result |= (octets[2] << 8)
  result |= (octets[3])
  return result
}
function parseOctets(netMask: number): number[] {
  return [
    (netMask & 0b1111_1111_0000_0000_0000_0000_0000_0000) >>> 24,
    (netMask & 0b0000_0000_1111_1111_0000_0000_0000_0000) >>> 16,
    (netMask & 0b0000_0000_0000_0000_1111_1111_0000_0000) >>> 8,
    (netMask & 0b0000_0000_0000_0000_0000_0000_1111_1111),
  ]
}

function getCount(size: number): number {
  return Math.pow(2, 32 - size)
}

const Cidr = (props: CidrProps) => {
  const [octet0, setOctet0] = useState(props.addr[0])
  const [octet1, setOctet1] = useState(props.addr[1])
  const [octet2, setOctet2] = useState(props.addr[2])
  const [octet3, setOctet3] = useState(props.addr[3])
  const [size, setSize] = useState(props.size)

  const count = getCount(size)
  const netMask = getNetMask(size)
  const netPart = fromOctets([octet0, octet1, octet2, octet3]) & netMask
  const hostPart = ~netMask

  const firstIp = netPart
  const lastIp = netPart | (hostPart)

  return (
    <CidrContainer>
      <h3>CIDR</h3>
      <div className="block">
        <input
          onChange={event => {
            const newValue = parseInt(event.target.value)
            setOctet0(inRange(newValue, 0, 255))
          }}
          value={octet0} />
        .
        <input
          onChange={event => {
            const newValue = parseInt(event.target.value) || 0
            setOctet1(inRange(newValue, 0, 255))
          }}
          value={octet1} />
        .
        <input
          onChange={event => {
            const newValue = parseInt(event.target.value) || 0
            setOctet2(inRange(newValue, 0, 255))
          }}
          value={octet2} />
        .
        <input
          onChange={event => {
            const newValue = parseInt(event.target.value) || 0
            setOctet3(inRange(newValue, 0, 255))
          }}
          value={octet3} />
        /
        <input
          onChange={event => {
            const newValue = parseInt(event.target.value) || 0
            setSize(inRange(newValue, 1, 32))
          }}
          value={size} />
      </div>
      <h3>NETMASK</h3>
      <span>{parseOctets(netMask).join('.')}</span>
      <h3>NETPREFIX</h3>
      <span>{parseOctets(netPart).join('.')}</span>
      <h3>FIRST IP</h3>
      <span>{parseOctets(firstIp).join('.')}</span>
      <h3>LAST IP</h3>
      <span>{parseOctets(lastIp).join('.')}</span>
      <h3>Count</h3>
      <span>{count}</span>
    </CidrContainer>
  )
}
export default Cidr;
