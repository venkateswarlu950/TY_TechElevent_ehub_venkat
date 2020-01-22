package com.tyss.ehub.dto;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;


import lombok.Data;

@Data
@Entity
@Table
public class PackageBillable {

	@Id
	@GeneratedValue
	@Column
	private int packageId;
	@Column
	private int compId;
	@Column
	private int empId;
	@Column
	private String employeeName;
	@Column
	private double paymentByTy;
	@Column
	private double paymentByClient;
	@Column
	private Date dopByTy;
	@Column
	private Date dopByClient;
	
}
