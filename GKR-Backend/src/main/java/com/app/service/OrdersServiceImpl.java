package com.app.service;

import com.app.pojos.Orders;
import com.app.dao.OrdersRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.app.pojos.PaymentStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.json.JSONObject;


@Service
public class OrdersServiceImpl implements IOrdersService {

    @Autowired
    private OrdersRepository ordersRepository;

    // Inject Razorpay credentials from application.properties
    @Value("${razorpay.key.id}")
    private String keyId; // Razorpay Key ID
    
    @Value("${razorpay.key.secret}")
    private String keySecret; // Razorpay Secret Key

    @Override
    @Transactional
    public Orders createOrder(int customerId, int homeMakerId, String amount) throws Exception {
        // Initialize RazorpayClient using credentials from properties file
        RazorpayClient razorpayClient = new RazorpayClient(keyId, keySecret);

        // Create Razorpay Order
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", Long.parseLong(amount) * 100); // Amount in paise
        orderRequest.put("currency", "INR");
        orderRequest.put("payment_capture", 1); // Auto-capture payment

        // Create Razorpay order
        Order razorpayOrder = razorpayClient.Orders.create(orderRequest);
        
     // In OrdersServiceImpl
        System.out.println("Created Order: " + razorpayOrder.toString());


        // Create and save the order in your database
        Orders order = new Orders();
        order.setOrderId(razorpayOrder.get("id").toString()); // Store Razorpay order ID
        order.setAmount(amount);
        order.setCustomerId(customerId);
        order.setHomeMakerId(homeMakerId);
        order.setDateTime(); // Set the date/time of the order
        order.setStatus(PaymentStatus.PENDING); // Initially set status to PENDING

        return ordersRepository.save(order); // Save order to database
    }

    @Override
    @Transactional
    public Orders updatePaymentStatus(String paymentId, String orderId, String status, String receipt) {
        // Find the order by orderId
        Orders order = ordersRepository.findByOrderId(orderId);

        if (order != null) {
            // Update payment details in the order
            order.setPaymentId(paymentId);
            order.setReceipt(receipt);
            order.setStatus(PaymentStatus.valueOf(status)); // Set the payment status (SUCCESS/FAILED)
            ordersRepository.save(order); // Save updated order in the database
        }

        return order;
    }
}
