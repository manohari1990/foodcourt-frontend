import { useInfiniteQuery } from "@tanstack/react-query"
import React, { useState, useEffect, useRef, useContext } from "react"
import { useParams } from "react-router-dom"
import { getMenuByStall } from "../api/menu"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import image1 from '../assets/image1.png';
import { CartContext } from "../store/store";

interface MenuItem {
  id: string
  name: string
  price: number
  image: string
}

function Row(props: { row: MenuItem }) {
  const { row } = props;
  const { updateCart } = useContext(CartContext)

  const [localCart, setLocalCart] = useState(0)

  const addToCart = () => {
    setLocalCart((prev) => {
      return prev = prev + 1
    })
    updateCart({item:row, action: 'add'})
  }

  const removeFromCart = () => {
    if (localCart === 0) return
    setLocalCart((prev) => {
      return prev = prev - 1
    })
    updateCart({item:row, action: 'remove'})
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={row.id}>
        <TableCell component="th" scope="row">
          <img src={`${row.image || image1}`} width={200} height='auto' />
        </TableCell>
        <TableCell align="right">{row.name}</TableCell>
        <TableCell align="left">{row.price}</TableCell>
        <TableCell align="right">
          <div style={{ display: 'inline', fontSize: '16px', padding: '10px' }}>
            <button style={{ border: '1px solid #eee', padding: '10px' }} onClick={addToCart}>+</button>
            <input type="text" style={{ border: '1px solid #eee', padding: '10px' }} value={localCart} readOnly />
            <button style={{ border: '1px solid #eee', padding: '10px' }} onClick={removeFromCart}>-</button>
          </div>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
export default function MenuPage() {
  const LIMIT = 10
  const { stallId } = useParams()
  const loadMoreRef = useRef(null)

  //react query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useInfiniteQuery({
    queryKey: ['menu', LIMIT, stallId],
    queryFn: getMenuByStall,
    initialPageParam: 0,
    getNextPageParam: (lastpage) => lastpage.next_offset
  })

  useEffect(() => {
    if (!hasNextPage) return

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchNextPage()
      }
    })

    observer.observe(loadMoreRef.current!)

    return () => observer.disconnect()
  }, [hasNextPage])


  if (isLoading) return <p>Fetching menu...</p>
  if (error) return <p>{error.message}</p>
  const menu = data?.pages.flatMap((item) => item.data)

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'right'
      }}>
        <button
          style={{
            border: 'none',
            borderRadius: '5px',
            background: '#454551',
            padding: '10px 7px',
            color: '#fff'
          }}
          // onClick={goToCart}
        >Continue to Cart</button>

      </div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Thumbnail</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menu && menu && menu.map((row: MenuItem) => (
              <Row key={row.name} row={row} />
            ))}

          </TableBody>
        </Table>
      </TableContainer>
      {isFetchingNextPage &&
        <div>
          Loading more...
        </div>
      }
      <div ref={loadMoreRef}></div>
    </>


  );
}
