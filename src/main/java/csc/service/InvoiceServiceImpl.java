package csc.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import csc.models.Customer;
import csc.models.Invoice;
import csc.repository.InvoiceRepository;

@Service("invoiceService")
public class InvoiceServiceImpl implements InvoiceService {

	@Autowired
	InvoiceRepository invoiceRepository;

	public InvoiceServiceImpl() {
	}

	@Override
	public Invoice findById(long id) {
		return invoiceRepository.findOne(id);
	}

	@Override
	public void saveInvoice(Invoice invoice) {
		invoiceRepository.save(invoice);
	}

	@Override
	public void updateInvoice(Invoice invoice) {
		//invoiceRepository.save(invoice);
		invoiceRepository.saveAndFlush(invoice);
	}

	@Override
	public void deleteInvoiceById(long id) {
		invoiceRepository.delete(id);
	}

	@Override
	public Page<Invoice> findByIdCustomer(Customer idcustomer, Pageable pageable) {
		return invoiceRepository.findByIdCustomer(idcustomer, pageable);
	}

	@Override
	public Page<Invoice> getListReport(Customer idCus, Date dateStart, Date dateEnd, int page, int pageSize) {
		PageRequest pageable = new PageRequest(page, pageSize);
		return invoiceRepository.findByIdCustomerAndDateBetween(idCus, dateStart, dateEnd, pageable);
	}


	@Override
	public Invoice getInvoice(String contractNum) {
		return invoiceRepository.findByContractNumber(contractNum);
	}

	@Override
	public Invoice findByContractNumberAndIdCustomer(String contractNum, Customer customer) {
		return invoiceRepository.findByContractNumberAndIdCustomer(contractNum, customer);
	}

	@Override
	public Page<Invoice> findAllInvoice(Customer idcustomer, String contractnumber, Pageable pageable) {
		return invoiceRepository.findByIdCustomerAndContractNumberContaining(idcustomer, contractnumber, pageable);

	}
}