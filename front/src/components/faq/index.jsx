import React from "react";
import { Accordion } from "react-bootstrap-accordion";

function FaqItem({ data }) {
  return (
    <section className="FAQ-section">
      <div className="tf-container st2">
        <div className="row">
          <div className="col-lg-12">
            <div className="accordion-page">
              <h4>Frequently Asked Questions</h4>
              <div className="flat-accordion">
                {data.map((item) => (
                  <Accordion
                    key={item.id}
                    title={item.title}
                    show={item.show}
                    className="flat-toggle"
                  >
                    <div className="toggle-content">
                      <p dangerouslySetInnerHTML={{ __html: item.content }} />
                      <p dangerouslySetInnerHTML={{ __html: item.content2 }} />
                      <p dangerouslySetInnerHTML={{ __html: item.content3 }} />
                      <p dangerouslySetInnerHTML={{ __html: item.content4 }} />
                      <p dangerouslySetInnerHTML={{ __html: item.content5 }} />
                      <p dangerouslySetInnerHTML={{ __html: item.content6 }} />
                      <p dangerouslySetInnerHTML={{ __html: item.content7 }} />
                      <p dangerouslySetInnerHTML={{ __html: item.content8 }} />
                      <p dangerouslySetInnerHTML={{ __html: item.content9 }} />
                      <p dangerouslySetInnerHTML={{ __html: item.content10 }} />
                      <p dangerouslySetInnerHTML={{ __html: item.content11 }} />
                      <p dangerouslySetInnerHTML={{ __html: item.content12 }} />
                      <p dangerouslySetInnerHTML={{ __html: item.content13 }} />
                      <p dangerouslySetInnerHTML={{ __html: item.content14 }} />
                      <p dangerouslySetInnerHTML={{ __html: item.content15 }} />
                      <p dangerouslySetInnerHTML={{ __html: item.content16 }} />
                      <p dangerouslySetInnerHTML={{ __html: item.content17 }} />
                      <p dangerouslySetInnerHTML={{ __html: item.content18 }} />
                      <p dangerouslySetInnerHTML={{ __html: item.content19 }} />
                    </div>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqItem;
