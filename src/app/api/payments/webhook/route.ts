import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { order_id, status, amount, transaction_id } = body

    console.log('Payment webhook received:', body)

    // Verify the webhook signature if needed (KukuPay might send a signature)
    // For now, we'll process the webhook without signature verification

    if (!order_id || !status) {
      return NextResponse.json(
        { success: false, error: 'Invalid webhook data' },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Verify the webhook signature
    // 2. Update your database with the payment status
    // 3. Send confirmation email to the donor
    // 4. Trigger any other post-payment processes

    if (status === 'success' || status === 'completed') {
      // Payment successful
      console.log(`Payment successful for order ${order_id}, amount: ${amount}`)

      // TODO: Add your database update logic here
      // Example:
      // await db.donation.update({
      //   where: { orderId: order_id },
      //   data: {
      //     status: 'completed',
      //     transactionId: transaction_id,
      //     completedAt: new Date()
      //   }
      // })

      // TODO: Send confirmation email
      // await sendConfirmationEmail(email, { amount, order_id, transaction_id })

      return NextResponse.json({ success: true })
    } else if (status === 'failed' || status === 'cancelled') {
      // Payment failed
      console.log(`Payment failed for order ${order_id}`)

      // TODO: Update database with failed status
      // await db.donation.update({
      //   where: { orderId: order_id },
      //   data: {
      //     status: 'failed',
      //     failedAt: new Date()
      //   }
      // })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { success: false, error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'Webhook endpoint is active'
  })
}